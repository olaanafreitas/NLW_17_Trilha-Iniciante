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
            case "logOut":
                console.log("Bye! See ya!")
                return
        }
    }
}

start()