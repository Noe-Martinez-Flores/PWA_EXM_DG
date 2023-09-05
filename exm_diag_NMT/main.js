const URL = 'https://reqres.in/api/users/';

const getPersons = async () => {
    const resp = await fetch(URL);
    const {data} = await resp.json();


    const table = document.querySelector('#table');
    data.forEach( (i,x) => {
        table.innerHTML+= `
        <tr class="text-center">
            <th scope="row">${x+1}</th>
            <td>${i.first_name} ${i.last_name}</td>
            <td>${i.email}</td>
            <td> 
                <button type="button" class="btn btn-info" style="color : white;" onclick="getPerson(${i.id})" data-bs-toggle="modal" data-bs-target="#getPerson">
                    <i class="fa-solid fa-info"></i>
                </button>
            </td>
            <td> 
                <button type="button" class="btn btn-warning" style="color : white;" onclick="editPerson(${i.id})" data-bs-toggle="modal" data-bs-target="#getPerson">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
            </td>
            <td> 
                <button type="button" class="btn btn-danger" style="color : white;" onclick="deletePerson(${i.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
            
        </tr>
        `
    });
}

const getPerson = async ( id ) => {

    const resp = await fetch(URL+id);
    const {data} = await resp.json();
    console.log(data)
    document.querySelector("#name").value = data.first_name;
    document.querySelector("#lastname").value = data.last_name;
    document.querySelector("#email").value = data.email;

    document.querySelector("#name").classList.add("disabled")
    document.querySelector("#lastname").classList.add("disabled")
    document.querySelector("#email").classList.add("disabled")
}

const buttonRegister = document.querySelector("#buttonRegister");
buttonRegister.addEventListener('click', () => {
    const button = document.createElement("button");
    button.textContent = "Registrar";
    button.classList.add("btn")
    button.classList.add("btn-success")

    button.onclick =  async () => {
        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                first_name :  document.querySelector("#name").value,
                last_name : document.querySelector("#lastname").value,
                email : document.querySelector("#email").value,
            }), 
        }).then( resp => resp.json() )
        .then( data => console.log(data), getPersons(), )
        .catch( console.error );
    }
    
    document.querySelector("#containerButton").appendChild(button);
});



const editPerson = async ( id ) => {
    const resp = await fetch(URL+id);
    const {data} = await resp.json();
    console.log(data)
    document.querySelector("#name").value = data.first_name;
    document.querySelector("#lastname").value = data.last_name;
    document.querySelector("#email").value = data.email;

    const button = document.createElement("button");
    button.textContent = "Modificar";
    button.classList.add("btn")
    button.classList.add("btn-success")
    button.onclick = async () => {
            await fetch(URL+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                first_name :  document.querySelector("#name").value,
                last_name : document.querySelector("#lastname").value,
                email : document.querySelector("#email").value,
            }), 
        });
    };

    document.querySelector("#containerButton").appendChild( button )

}

const deletePerson = async( id ) =>{
    await fetch(URL+id,{ 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json', 
        },
    }).then( resp => resp.json() )
    .then( resp => alert("Eliminación echa"))
    .catch( alert )
}

getPersons();