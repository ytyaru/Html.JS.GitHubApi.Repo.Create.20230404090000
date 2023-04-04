window.addEventListener('DOMContentLoaded', async(event) => {
    await Parser.setup()
    Form.setup()
});
window.addEventListener('beforeunload', (event) => {
    console.debug('beforeunload!!');
});

