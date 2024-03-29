const React = require('react')
const Default = require('./layouts/Default')

function Show ({bread, index}) {
  console.log(bread.name)
    return (
      <Default>
        <h2>Show Page</h2>
        <a href={`/breads/${index}/edit`}><button>Edit</button></a>
        <h3>{bread.name}</h3>
        <p>
            and it 
            {
                bread.hasGluten 
                ? <span> does </span>
                :<span> does NOT </span>
            }
            have gluten.
        </p>     
        <img src={bread.image} alt={bread.name}/> 
        <p>Baked by{bread.baker()}</p>  
<form action={`/breads/${bread.id}?_method=DELETE`} method="POST">
  <input type='submit' value="DELETE"/>
</form>
    
        <li><a href="/breads">Go home</a></li>
      </Default>
    )
}



module.exports = Show
