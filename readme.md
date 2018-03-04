# SmartCLI
[![Build Status](https://travis-ci.org/caiusCitiriga/smart-cli.svg?branch=1.0.0)](https://travis-ci.org/caiusCitiriga/smart-cli)

## What is SmartCLI
SmartCLI is a NodeJS framework for building flexible and powerful console applications. It provides a clean commands structure, and various UI tools.

SmartCLI can be used just for its **UI** library, or you can leverage its **Parser** and **Dispatcher** to create your application. Built on **commands** and **flags**.

#### Demo:
[Quick demo of all the core features](https://github.com/caiusCitiriga/smart-cli/blob/master/src/demo/demo.ts): copy and paste this file to have a working demo.


## Getting started
**Install the package:**

`npm i smart-cli`

**Create a new file and call it `demo.ts`**

**Make your file executable from the command line by adding this line at the top:**
```typescript
#! /usr/bin/env node
```

**Include SmartCLI in your file and initialize a new instance:**

```typescript
#! /usr/bin/env node
import {SmartCLI} from 'smart-cli/dist'

const cli = new SmartCLI();
```

**Add a test command and run the program passing the arguments that the user provided with the call.
Ideally we would use the data passed by the user from the `process.argv` array, here's the full example:**
```typescript
#! /usr/bin/env node
import * as process from 'process';
import {SmartCLI} from 'smart-cli/dist'

const cli = new SmartCLI();

cli
    .addCommand({
        name: 'title',
        flags: [],
        description: 'Prints a SmartCLI title',
        action: (flags: IFlag[]) => {
            cli.UI.out.printTitle('Test title');
        },
    })
    .run(process.argv.filter((arg, idx) => idx >= 2).join(' ').toString());
```

**Now try to run your file passing this command:**
```bash
node demo.js title
```

Congrats! You should get a title saying: **'Test title'**

## Adding commands
SmartCLI features a **fluent** notation, which means that you can pass one command after another by chaining the calls to the **addCommand()** method.

```typescript

//  Fluent commands configuration
cli
    .addCommand({
        name: 'cmd1',
        flags: [],
        description: 'Test command',
        action: (flags: IFlag[]) => null,
    })
    .addCommand({
        name: 'cmd2',
        flags: [],
        description: 'Test command',
        action: (flags: IFlag[]) => null,
    });
```

## Commands structure
```typescript
interface ICommandOpts {
    name: string;
    flags: IFlag[];
    action: (flags: IFlag[]) => void;
    description: string;
}
```

* **Name:** the name of that command. The user will use this to trigger it.
* **Description:** this will be the description for your command. Used by the HelpManager when `help` is called.
* **Flags:** the available flags that the user can pass along with this command.
* **Action:** the callback that will be executed when this command will be fired. It's a function, that provides one argument: `IFlag[]`. Which is an array of flags passed by the user. The flags are already parsed, so you can access them safely.

## Flags structure
```typescript
interface IFlag {
    name: string;
    options: IOption[];
    description?: string;
}
```
The flags are powerful tools for your commands that allows you to build flexible and configurable commands. Yet, keeping a clean syntax.
You define your flags with your commands, when adding them to the **CLI** instance.

**Note:** Flags uses a 'double-dash' notation `--`. This is not yet configurable, but in a future release it will be possible to configure the flags delimiter.

> Flags divides in two main categories:
> * Direct value flags
> * Complex value flags
>
> ***Direct value flags:*** 
>
> These are the normal flags you are used to: `cmd --flag=value`.
>
> ***Complex value flags:***
>
>Takes the normal flags and extends the concept into a multi-value flag. You can use this as a shortcut for your commands. 
>
>Instead of passing three ipotetic flags to a command like this: 
>
>`cmd --set-rpm=100 --set-light=off --set-door=open`
>
>You can create a single `set` flag, and pass it three options like this:
>
>`cmd --set:rpm=10:light=off:door=open`
>
>[Learn more about this.](#flags-options-structure)

Each flag has three properties:
* **Name:** The name of the flag.
* **Description:** The description of that flag. What it will do if used. This description is read by the Help Manager and used to print the specific help for that command.
* **Options:** This is an array of `IOption` objects. Each option has a **name** and **value**.

## Flags options structure
```typescript
interface IOption {
    name: string;
    value: string;
}
```
If you need the user to pass more informations along with a flag, or just want to provide a handy shortcut for multiple flags, you can leverage the flag options property. 

This allows the **Parser** to extract more than one value from a single flag. These values will be then pushed inside the **options** array on the **Flag** that you recieve in the callback. In this way you can use that information.

Here's an example of how to create and use a **complex-value flag**:
```typescript
cli
    .addCommand({
        //  How to run: complex-flag --flag:value1=Yolo:value2=Molo'
        name: 'complex-flag',
        flags: [
            {
                name: 'flag',
                description: '[Options flag values] A flag with options to demonstrate how to pass additional precise info to the callback, from the user. With a clean syntax',
                options: [
                    {
                        name: 'value1',
                        value: 'string' //  typechecks are not yet implemented
                    },
                    {
                        name: 'value2',
                        value: 'string' //  typechecks are not yet implemented
                    }
                ]
            }
        ],
        description: 'Prints the resulting values in a kvp list',
        action: (flags: IFlag[]) => {
            const kvp: IKeyValuesOpts = {
                set: []
            };

            flags[0].options.forEach(opt => kvp.set.push({ k: opt.name, v: opt.value }));
            cli.UI.out.printKeyValues(kvp);
        }
    })
```

## UI Library
```typescript
interface IUserInterface {
    out: IOutput;
    input: IInput;
}
```
SmartCLI still features the legacy UI library, with some tweaks and improvements. The UI library divides into **Input** and **Output** and it is exposed by the **SmartCLI** class.

### Output
```typescript
interface IOutput {
    printInfo(text: string): void;
    printTitle(text: string): void;
    printError(text: string): void;
    printMessage(text: string): void;
    printWarning(text: string): void;
    printSubtitle(text: string): void;
    printBoxTitle(text: string): void;
    printKeyValues(opts: IKeyValuesOpts): void;
    printTableExperimental(table: ITableOpts): void;
}
```

* **printInfo()**: Prints a info message to the console. Takes a **string** param.
* **printTitle()**: Prints a title to the console. Takes a **string** param.
* **printError()**: Prints a error message to the console. Takes a **string** param.
* **printMessage()**: Prints a normal message to the console. Takes a **string** param.
* **printWarnint()**: Prints a warning message to the console. Takes a **string** param.
* **printSubtitle()**: Prints a subtitle to the console. Takes a **string** param.
* **printBoxTitle()**: Prints a title wrapped into a box to the console. Takes a **string** param.
* **printKeyValues()**: Prints a set of key-value pairs to the console. Takes a **IKeyValuesOpts** param.
* **printTableExperimental()**: Prints a table to the console (experimental feature). Takes a **ITableOpts** param.

**IKeyValuesOpts**
```typescript
interface IKeyValuesOpts {
    set: {
        k: string;
        v: string;
    }[];
    spacerChar?: string;
}
```

**ITableOpts**
```typescript
interface ITableOpts {
    heading: string[];
    rows: Array<string[]>
}
```

### Input
```typescript
interface IInput {
    askUserInput(opts: IUserInputOpts): void;
}
```

This method takes a **IUserInputOpts** param. It prompts the user with a question, and then it registers the input provided by the user as an answer. It will then pass the answer to the callback which will be executed whenever the user will press **ENTER**

Usage example:
```typescript
cli
.addCommand({
    name: 'prompt',
    flags: [],
    description: 'Propmts the user with a question',
    action: (flags: IFlag[]) => {
        cli.UI.input.askUserInput({
            question: 'How are you?',
            surroundWithNewLines: true,
            callback: (answer) => {
                console.log(`Answer was: ${answer}`);
            }
        });
    }
})
```

## Help Manager
SmartCLI also features a built-in **HelpManager**. 

You won't need to worry about creating a help command that will describe the usage of each command. SmartCLI already does this for you. 

That's why you have to provide descriptions for ***commands*** and ***flags***. 

Also, when you want to create a **complex-value** flag that will accept several options, you define these options when adding the command to the CLI. 

Providing the **name** and the value-type that you expect to recieve as a string, on the **value** property.

The accepted values are:

* string
* number
* boolean

***Note:*** at the moment the **Parser** ignores these types, but in the future releases the type-check will be extended to the **Parser** too.

In this way, when the **HelpManager** will encounter a command with flags and options provided, it will automatically print information about those options. The ***name***, the ***value type*** and a usage example.

Here's a HelpManager "compliant" command configuration example:
```typescript
cli
.addCommand({
    //  How to run: complex-flag --flag:value1=Yolo:value2=Molo'
    name: 'complex-flag',
    flags: [
        {
            name: 'flag',
            description: '[Options flag values] A flag with options to demonstrate how to pass additional precise info to the callback, from the user. With a clean syntax',
            options: [
                {
                    name: 'value1',
                    value: 'string' //  typechecks are not yet implemented
                },
                {
                    name: 'value2',
                    value: 'string' //  typechecks are not yet implemented
                }
            ]
        }
    ],
    description: 'Prints the resulting values in a kvp list',
    action: (flags: IFlag[]) => {
        const kvp: IKeyValuesOpts = {
            set: []
        };

        flags[0].options.forEach(opt => kvp.set.push({ k: opt.name, v: opt.value }));
        cli.UI.out.printKeyValues(kvp);
    }
})
```

If you want to give it a try, run the `help` command at any moment. 
You will see a **General help** screen, listing all the commands you've provided with the CLI, and the description for each command.

If you try to run the `help` command followed by a flag with the name of the command you want details about, you will see a screen printing the description about that command.

A list of each flag (if any), and for each flag, a list of each option (name, value type and usage) if any.

## Thanks for using it
As always, thanks for finding this useful. If you really like this project, please consider to star it. 

If you found a bug, or you'd like to add a new feature, please feel free to open a new Issue, or a Pull Request.

---
### Built With
* [Chalk](https://github.com/chalk/chalk) - Terminal string styling done right
* [Inversify](https://github.com/inversify/InversifyJS/) - A powerful and lightweight IoC container
* [TypeScript](https://github.com/Microsoft/TypeScript) - TypeScript is a superset of JavaScript that compiles to clean JavaScript output.
* **Love and passion. For coding, and beautiful code**

### Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/caiuscitiriga/smart-cli/tags). 

### Authors
* [**Caius Citiriga**](https://github.com/caiuscitiriga)

### Testing
The code is tested with Jasmine on its core parts, and all the possible break points are covered. So each release won't break any existing feature from now.

### License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

### Acknowledgments
* [Automattic](https://github.com/Automattic) for the table fonts.
