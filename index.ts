import app from './src/server';

const port: number = 3000;

app.listen(port , () => {
    console.log('Expres server started on port: ' + port);
})