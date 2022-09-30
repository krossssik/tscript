import { Observable } from 'rxjs';

export class SignService {
    private users = [
        { id: 1, name: 'dima', pass: 'qwerty' },
        { id: 2, name: 'nik', pass: '12345' },
        { id: 3, name: 'ana', pass: 'cat' },
        { id: 4, name: 'lena', pass: '23.11.19' },
    ];

    cheskUser(name: string = '', pas: string = ''): boolean {
        for (let user of this.users) {
            return name === user.name && pas === user.pass;
        }
    }
}