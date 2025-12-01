// Simulação de Banco de Dados em Memória
const users = [
    { id: 1, name: 'Alice', balance: 1000 },
    { id: 2, name: 'Bob', balance: 500 }
];

const bankService = {
    getBalance: (userId) => {
        const user = users.find(u => u.id === userId);
        return user ? user.balance : null;
    },

    transfer: (senderId, receiverId, amount) => {
        const sender = users.find(u => u.id === senderId);
        const receiver = users.find(u => u.id === receiverId);

        // Cenário 4: Teste de Entrada (IDs inexistentes)
        if (!sender || !receiver) {
            throw new Error("Usuário não encontrado");
        }

        // Cenário 3: Teste de Limite (Valor negativo ou zero)
        if (amount <= 0) {
            throw new Error("Valor inválido");
        }

        // Cenário 2: Cenário Negativo (Saldo Insuficiente)
        if (sender.balance < amount) {
            throw new Error("Saldo insuficiente");
        }

        // Cenário 1: Caminho Feliz
        sender.balance -= amount;
        receiver.balance += amount;

        return {
            success: true,
            newSenderBalance: sender.balance,
            message: "Transferência realizada"
        };
    }
};

module.exports = bankService;