import animal from "../models/animalModel.js"
import path from "path"

export const getAnimal = async (req, res) =>{
    try{
        const response = await animal.findAll();
        res.json(response)
    } catch(error){
        console.log(error.message)
    }
}

export const getAnimalbyId = async (req, res) =>{ //pega o bixo pelo id
    try{ //tente
        const response = await animal.findOne({ //procure 1
            where: {
                id: req.params.id
            }
        });
        res.json(response)
    } catch(error){
        console.log(error.message)
    }
}
export const saveAnimal = (req, res) =>{

    if(req.files === null) return res.status(400).json({msg: "Deu certo não ó, tem que mandar uma ae"})
   
    //coisas do bixinho 
    const name = req.body.nome;
    const especie = req.body.especie;
    const sexoDoBichinho = req.body.sexoDoBichinho;
    const idade = req.body.idade;
    const porte = req.body.porte;
    const estado = req.body.estado;
    const cidade = req.body.cidade;
    
    // imagem do bixinho
    const file = req.files.foto;
    const fileSize = file.data.length;
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"serve essa não patrão"})
    if(fileSize > 5000000) return res.status(422).json({msg:"a foto é grande demais fi"})
    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message})
        try{
    await animal.create({

        nome: name,
        imagem: fileName,
        especie: especie,
        sexoDoBichinho: sexoDoBichinho,
        idade: idade,
        porte: porte,
        estado: estado,
        cidade: cidade,
        url: url
    })
    res.status(201).json({msg:"animalzinho foi pra doação ó"})
    }catch(error) {
    console.log(error.message);
    }

    })
}
