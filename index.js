const { select, input } = require('@inquirer/prompts')

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
                    name: "List a new goal",
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
                console.log("List a new goal:")
                break
            case "logOut":
                console.log("Bye! See ya!")
                return
        }
    }
}

start()