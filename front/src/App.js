import { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import Tabela from "./components/Tabela";
import './globalStyle.css';


function App() {

  //Objeto produto
  const produto = {
    codigo : 0,
    nome : '',
    marca : ''
  }

  //UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  //UseEffect
  useEffect(() => {
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  // Obtendo os dados do form
  const aoDigitar = (event) =>{
    setObjProduto({...objProduto, [event.target.name]: event.target.value});
  }

  //Cadastrar Produto
  const cadastrar = () => {
    fetch("http://localhost:8080/cadastrar", {
      method:'post',
      body:JSON.stringify(objProduto),
      headers:{
        "Content-type" : "application/json",
        "Accept" : "application/json"
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        setProdutos([...produtos, retorno_convertido])
        alert("Produto Cadastrado Com Sucesso!")
        limparForms();
      }
    })
  }

  const alterar = () => {
    fetch("http://localhost:8080/alterar", {
      method:'put',
      body:JSON.stringify(objProduto),
      headers:{
        "Content-type" : "application/json",
        "Accept" : "application/json"
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        alert("Produto Alterado Com Sucesso!")

        // copia do vetor de produtos
      let vetorTemp = [...produtos];

      // indice
      let indice = vetorTemp.findIndex((p) => {
        return p.codigo === objProduto.codigo;
      });

      //Alterar produto do vetorTemp
      vetorTemp[indice] = objProduto;

      //Atualizar o vetor
      setProdutos(vetorTemp);

        limparForms();
      }
    })
  }

  //remover Produto
  const remover = () => {
    fetch("http://localhost:8080/deletar/"+objProduto.codigo, {
      method:'delete',
      headers:{
        "Content-type" : "application/json",
        "Accept" : "application/json"
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      alert(retorno_convertido.mensagem);

      // copia do vetor de produtos
      let vetorTemp = [...produtos];

      // indice
      let indice = vetorTemp.findIndex((p) => {
        return p.codigo === objProduto.codigo;
      });

      //remover produto do vetorTemp
      vetorTemp.splice(indice, 1);

      //Atualizar o vetor
      setProdutos(vetorTemp);
      
      //Limpar forms
      limparForms();

    })
  }

  //limpar form
  const limparForms = () =>{
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  //Selecionar produto
  const selecionarProduto = (indice) =>{
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  return (
    <div className="App">
      <h1>Cadastro de Produtos</h1>
      <Formulario botao = {btnCadastrar} eventoTeclado={aoDigitar} cadastrar = {cadastrar} obj = {objProduto} cancelar={limparForms} remover = {remover} alterar = {alterar}/>
      <Tabela vetor={produtos} selecionar = {selecionarProduto}/>
    </div>
  );
}

export default App;
