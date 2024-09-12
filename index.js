const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Drink 3L of water per day',
    checked: false,
}

let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({message: "Type your goal:"})

    if(meta.length == 0) {
        console.log("Can't log a blank goal.")
        return
    }
    metas.push(
        {value: meta, checked: false}
    )
}

const listarMetas =  async () => {
    const respostas = await checkbox ({
        message: "Use the arrow keys to change goal, space to check or uncheck and enter to finish the step.",
        choices: [...metas],
        instructions: false,
    }) 

    if(respostas.lenght == 0) {
        console.log("No goal was selected.")
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

    console.log('Goal(s) completed')

}

const metasRealizadas = async () => {
    const realizadas = metas.filter ((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        console.log('There are no finished goals :(')
        return
    }

    await select({
        message: "Finished goals " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async  () => {
    const abertas = metas.filter ((meta) => {
        return meta.checked != true
    })
    
    if(abertas.lenght == 0) {
        console.log("There are no goals open! :)")
        return
    }

    await select({
        message: "Open goals " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })
    const itensADeletar = await checkbox ({
        message: "Select an item to delete.",
        choices: [...metasDesmarcadas],
        instructions: false,
    }) 

    if(itensADeletar.length == 0) {
        console.log("There are no itens to delete!")
        return
}

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    console.log("Goals deleted successfully!")

}
const start = async () => {
    
    while(true){

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
                console.log(metas)
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