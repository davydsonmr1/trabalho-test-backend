const bankService = require('./bankService');

describe('Testes Unitários: bankService', () => {

    // Cenário 1: Caminho Feliz
    test('Deve transferir valor corretamente entre contas com saldo suficiente', () => {
        // Alice tem 1000. Transfere 500 para Bob.
        const result = bankService.transfer(1, 2, 500);
        
        expect(result.success).toBe(true);
        expect(result.newSenderBalance).toBe(500); // 1000 - 500
    });

    // Cenário 2: Saldo Insuficiente
    test('Não deve permitir transferência com saldo insuficiente', () => {
        // Alice agora tem 500. Tenta transferir 600.
        expect(() => {
            bankService.transfer(1, 2, 600);
        }).toThrow("Saldo insuficiente"); // Verifica se o erro exato foi lançado
    });

    // Cenário 3: Teste de Limite (Boundary)
    test('Não deve permitir transferência de valor zero ou negativo', () => {
        expect(() => {
            bankService.transfer(1, 2, 0);
        }).toThrow("Valor inválido");
        
        expect(() => {
            bankService.transfer(1, 2, -100);
        }).toThrow("Valor inválido");
    });

    // Cenário 4: Teste de Entrada (Input)
    test('Deve retornar erro se um dos usuários não existir', () => {
        expect(() => {
            bankService.transfer(99, 2, 100); // Usuário 99 não existe
        }).toThrow("Usuário não encontrado");
    });
});
