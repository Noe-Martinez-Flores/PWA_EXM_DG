const URL = 'https://reqres.in/api/users/';

const getPersons = async () => {
    const resp = await fetch(URL);
    const {data} = await resp.json();
    
    console.log(typeof(data))

    const table = document.querySelector('#table');
    data.map( (i,x) => {
        table.innerHTML+= `
        <tr class="text-center">z
            <th scope="row">${x+1}</th>
            <td>${i.first_name} ${i.last_name}</td>
            <td>${i.email}</td>
            <td> 
                <button type="button" class="btn btn-info" style="color : white;" onclick="getPerson(${i.id})" data-bs-toggle="modal" data-bs-target="#getPerson">
                    <i class="fa-solid fa-info"></i>
                </button>
            </td>
            <td> 
                <button type="button" class="btn btn-warning" style="color : white;" onclick="editPerson(${i.id})">
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
}

const createPerson = async () => {

}

const detailPerson = async ( id ) => {

}



const editPerson = async ( id ) => {
    const resp = await fetch(URL+id);
    const {data} = await resp.json();
    console.log(data)
    document.querySelector("#name").value = data.first_name;
    document.querySelector("#lastname").value = data.last_name;
    document.querySelector("#email").value = data.email;

    document.querySelector("#containerButton")

    //<button type="button" class="btn btn-primary" id="button">Save changes</button>
}

const deletePerson = async( id ) =>{
    await fetch(URL+id,{ method: 'DELETE' })
}

getPersons();