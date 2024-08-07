import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import inquirer from 'inquirer';
import { AppModule } from 'src/app.module';
import { AuthenticationService } from 'src/iam/authentication/authentication.service';

async function promptForInput(promptOptions) {
    let input: string | undefined;
    while (!input) {
        try {
            const answers = await inquirer.prompt([promptOptions]);
            input = answers[promptOptions.name as string];
            if (!input) {
                console.error(`Invalid input for ${promptOptions.name}. Please try again.`);
            }
        } catch (error) {
            console.error(`Error with ${promptOptions.name} prompt: ${error.message}. Please try again.`);
        }
    }
    return input;
}

async function createSuperAdmin() {
    const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
    const authenticationService = app.get(AuthenticationService);

    try {
        const email = await promptForInput({
            type: 'input',
            name: 'email',
            message: 'Enter email:',
            validate: (input: string) => input && input.includes('@') ? true : 'Invalid email address',
        });

        let password: string | undefined;
        let confirmPassword: string | undefined;

        while (!password || password !== confirmPassword) {
            password = await promptForInput({
                type: 'password',
                name: 'password',
                message: 'Enter password:',
                mask: '*',
                validate: (input: string) => input && input.length >= 6 ? true : 'Password must be at least 6 characters long',
            });

            confirmPassword = await promptForInput({
                type: 'password',
                name: 'confirmPassword',
                message: 'Confirm password:',
                mask: '*',
                validate: (input: string) => input && input.length >= 6 ? true : 'Password must be at least 6 characters long',
            });

            if (password !== confirmPassword) {
                console.error('Passwords do not match. Please try again.');
            }
        }

        const name = await promptForInput({
            type: 'input',
            name: 'name',
            message: 'Enter name:',
            validate: (input: string) => input && input.trim() !== '' ? true : 'Name is required',
        });

        const message = await authenticationService.createSuperAdmin(email, password, name);
        console.log(message);

    } catch (error) {
        console.error('Error creating SuperAdmin user:', error);
    } finally {
        await app.close();
    }
}

createSuperAdmin().catch((error) => {
    console.error('Unexpected error:', error);
});
