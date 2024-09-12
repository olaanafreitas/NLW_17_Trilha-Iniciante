const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Welcome to your Goal's App";

let metas

const carregarMetas = async () => {
    try {
        const dados = await  fs.readFile("metas.json", "utf-8")
        metas= JSON.parse(dados)
    }
    catch(erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
    const meta = await input({message: "Type your goal:"})

    if(meta.length == 0) {
        mensagem = "Can't log a blank goal."
        return
    }
    metas.push(
        {value: meta, checked: false}
    )

    mensagem = "Registered with success!"
}

const listarMetas =  async () => {
    
    if(metas.lenght == 0) {
        mensagem = "There are no goals!"
        return
    }

    const respostas = await checkbox ({
        message: "Use the arrow keys to change goal, space to check or uncheck and enter to finish the step.",
        choices: [...metas],
        instructions: false,
    }) 

    if(respostas.lenght == 0) {
        mensagem = "No goal was selected."
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta

        })

        meta.checked = true
    })

    mensagem = 'Goal(s) completed'

}

const metasRealizadas = async () => {

    if(metas.lenght == 0) {
        mensagem = "There are no goals!"
        return
    }

    const realizadas = metas.filter ((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        mensagem = 'There are no finished goals :('
        return
    }

    await select({
        message: "Finished goals " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async  () => {

    if(metas.lenght == 0) {
        mensagem = "There are no goals!"
        return
    }

    const abertas = metas.filter ((meta) => {
        return meta.checked != true
    })
    
    if(abertas.lenght == 0) {
        mensagem = "There are no open goals! :)"
        return
    }

    await select({
        message: "Open goals " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {

    if(metas.lenght == 0) {
        mensagem = "There are no goals!"
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })
    const itensADeletar = await checkbox ({
        message: "Select an item to delete.",
        choices: [...metasDesmarcadas],
        instructions: false,
    }) 

    if(itensADeletar.length == 0) {
        mensagem = "There are no itens to delete!"
        return
}

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Goals deleted successfully!"

}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    await carregarMetas()

    while(true){
        mostrarMensagem()
        await salvarMetas()

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Insert goal",
                    value: "register"
                },
                {
                    name: "List goals",
                    value: "list"
                },
                {
                    name: "Finished goals",
                    value: "finished"
                },
                {
                    name: "Open goals",
                    value: "unfinished"
                },
                {
                    name: "Delete goals",
                    value: "delete"
                },
                {
                    name: "Log Out",
                    value: "logOut"
                }
            ]
        })

        switch(opcao) {
            case "register":
                await cadastrarMeta()
                break
            case "list":
                await listarMetas()
                break
            case "finished":
                await metasRealizadas()
                break
            case "unfinished":
                await metasAbertas()
                break
                case "delete":
                    await deletarMetas()
                    break    
            case "logOut":
                console.log("Bye! See ya!")
                return
        }
    }
}

start()