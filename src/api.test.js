const request = require('supertest');
const app = require('./api'); // Importa o app express

describe('Testes de Integração: API de Transferência', () => {

    // Verifique se a API retorna HTTP 200 quando tudo dá certo
    test('POST /transfer - Deve realizar transferência com sucesso (HTTP 200)', async () => {
        const response = await request(app)
            .post('/transfer')
            .send({
                senderId: 1,
                receiverId: 2,
                amount: 100 // Valor pequeno para garantir que passa
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
    });

    // Verifique se a API retorna HTTP 400 se faltar campo
    test('POST /transfer - Deve retornar erro 400 se faltar campo amount', async () => {
        const response = await request(app)
            .post('/transfer')
            .send({
                senderId: 1,
                receiverId: 2
                // amount faltando
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Dados incompletos');
    });

    // Verifique se a API retorna o erro correto se o usuário não existir
    // Nota: No seu api.js original, erros genéricos retornam 500. Vamos verificar isso.
    test('POST /transfer - Deve retornar erro se usuário não existir', async () => {
        const response = await request(app)
            .post('/transfer')
            .send({
                senderId: 999, // Não existe
                receiverId: 2,
                amount: 50
            });

        // O seu código original trata erros no catch como 500.
        // Se quiséssemos ser perfeitos, mudaríamos o api.js para retornar 404, 
        // mas o teste espera que validemos o comportamento atual.
        expect(response.status).toBe(500); 
        expect(response.body).toHaveProperty('error', 'Usuário não encontrado');
    });
});
