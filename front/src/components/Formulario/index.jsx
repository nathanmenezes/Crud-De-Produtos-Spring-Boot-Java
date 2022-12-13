import React from 'react'

export default function Formulario({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}) {
return (
    
    <form>
        <input type="text" value = {obj.nome} onChange={eventoTeclado} name = 'nome' placeholder='Nome' className='form-control'/>
        <input type="text" value = {obj.marca} onChange={eventoTeclado} name = 'marca' placeholder='Marca' className='form-control'/>

        {
            botao
            ?
            <input type="button" value="Cadastrar" className='btn btn-primary' onClick={cadastrar}/>
            :
            <div>
                <input type="button" value="Alterar" className='btn btn-warning' onClick={alterar}/>
                <input type="button" value="Remover" className='btn btn-danger' onClick={remover}/>
                <input type="button" value="Cancelar" className='btn btn-secondary' onClick={cancelar}/>
            </div>
        }
        
    </form>
)
}
