const { select } = require('@inquirer/prompts')

const start = async() => {
    
    while(true){

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Insert goal",
                    value: "Register"
                },
                {
                    name: "List a new goal",
                    value: "Fill Up"
                },
                {
                    name: "Log Out",
                    value: "Log Out"
                }
            ]
        })

        switch(opcao) {
            case "Sign Up":
                console.log("Let's Sign Up")
                break
            case "Fill":
                console.log("Let's fill up")
                break
            case "Sign Out":
                console.log("Bye! See ya!")
                return
        }
    }
}

start()