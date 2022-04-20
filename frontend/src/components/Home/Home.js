import './../../App.css'; 
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import S3FileUpload from 'react-s3';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import InputAdornment from '@mui/material/InputAdornment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import Cookies from 'universal-cookie';
const S3_BUCKET = 's3ufsebucket';
const REGION = 'us-east-2';
const ACCESS_KEY = 'AKIA5S2N4Y6VJGQX6T4T';
const SECRET_ACCESS_KEY = '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';
window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
  bucketName: S3_BUCKET,
  dirName: "",
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
}
const style = {
  margin: 0,
  top: 'auto',
  right: 30,
  bottom: 75,
  left: 'auto',
  position: 'fixed',
}; 

const cartStyle = {
  margin: 0,
  top: 'auto',
  right: 30,
  bottom: 150,
  left: 'auto',
  position: 'fixed',
};

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState()
  const [itemCount, setItemCount] = useState(0);	
  const [selectedFile, setSelectedFile] = useState(null);
  const [cartItems, setCartItems] = useState([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openCart, setOpenCart] = React.useState(false);
  const handleCartOpen = () => setOpenCart(true);
  const handleCartClose = () => setOpenCart(false);
  const handleFileInput = (e) => {
      setSelectedFile(e.target.files[0]);
    }
    const cookies = new Cookies();   
      const mainsession = cookies.get('mainsession');
  const callLogoutApi = (e) => {
    e.preventDefault();
    fetch('http://13.71.87.168:8080/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': '/'
      }
    })
      .then(
        (r) => {
          if (r.status === 200) {
            cookies.remove('mainsession');
            //navigate("/")
          }
        },
        (r) => {
          console.log(r)
        }
      )
  }
  const callDeleteApi = (c) => {

    fetch('http://13.71.87.168:8080/delete/' + c, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': '/'
      }
    })
      .then(
        (r) => {
          if (r.status === 200)
            window.location.reload(false);
        },
        (r) => {
          console.log(r)
        }
      )
  }
  const addItemToCart = (item) => {
    let cartItemsArray = [...cartItems]
    cartItemsArray.push(item);
    console.log(cartItemsArray)
    setCartItems(cartItemsArray)
	
  }

  const placeOrder = (c) => {
    c.preventDefault();
    let posts = []
    if (cartItems.length > 0)
    {
      cartItems.map(function (c, i) {
        posts.push({"productId":c.ID, "count": c.count})
    })
    }

    console.log(JSON.stringify({
      posts
    }))
    
    fetch('http://13.71.87.168:8080/placeOrder', {
      method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          posts
        })
    })
    .then(
      (r) => {
        console.log(r)
        if (r.status === 200)
          window.location.reload(false);
      },
      (r) => {
        console.log(r)
      }
    )
  }

  const changeFavIcon = (c) => {
     console.log(c.isFav)
     var f = !c.isFav
     console.log(f)
    fetch('http://13.71.87.168:8080/update/' + JSON.stringify(c.ID), {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isFav : f
      })
    })
      .then(
       (r)=>{
         console.log(r);
         window.location.reload(true)
       }
      )
  }
  const callEditApi = (c) => {
   
  
    /* e.preventDefault();
    console.log(e.target.elements);
    fetch('http://13.71.87.168:8080/update/' + selectedPost, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: e.target.elements.name.value,
        description: e.target.elements.Description.value,
        location: e.target.elements.Location.value,
        dimensions: e.target.elements.Dimensions.value,
        weight: parseInt(e.target.elements.Weight.value),
        age: parseInt(e.target.elements.Age.value),
        count: parseInt(e.target.elements.Count.value),
      })
    })
      .then(
        (r) => {
          console.log(r)
          if (r.status === 200)
            window.location.reload(false);
        },
        (r) => {
          console.log(r)
        }
      )*/
  }

  const callCreateApi = (e) => {
    console.log("came here")
    e.preventDefault();
    handleClose();
    S3FileUpload.uploadFile(selectedFile, config)
      .then(data => {
        fetch('http://13.71.87.168:8080/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: e.target.elements.name.value,
          description: e.target.elements.Description.value,
          location: e.target.elements.Location.value,
          dimensions: e.target.elements.Dimensions.value,
          weight: parseInt(e.target.elements.Weight.value),
          age: parseInt(e.target.elements.Age.value),
          count: parseInt(e.target.elements.Count.value),
          imageUrl: data["location"]
        })
      }).then(
        (r) => {
          console.log(r)
          if (r.status === 200)
            window.location.reload(false);
        },
        (r) => {
          console.log(r)
        }
      )
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetch('http://13.71.87.168:8080/read', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': '/'
      }
    })
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(jsondata => {
        console.log(jsondata)
        setPosts(jsondata);
      })
  }, [])
  return (
    <Box sx={{ flexGrow: 2 }}>
      <div class="d-flex flex-row-reverse bd-highlight">
        <div class="p-2  bd-highlight">
          <form className="form-inline" onSubmit={callCreateApi}>
            <Fab style={style} onClick={handleOpen} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </form>          
        </div>
        <div>
          <form className="form-inline" onSubmit={placeOrder}>
            <Fab style={cartStyle} onClick={handleCartOpen} color="primary" aria-label="add">
              <ShoppingCartIcon />
            </Fab>
          </form>          
        </div>
      </div>
                 
      <Grid container spacing={1}>
        {posts != null ? posts.map(function (c, i) {
          return (
            <Grid item xs={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={c.imageUrl}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {c.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {c.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Dimensions: {c.dimensions}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Weight: {c.weight}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Product Age: {c.age}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Count: {c.count}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    
                    IsFav: {JSON.stringify(c.isFav)}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 7}}>
	                  <Button variant="contained" startIcon={<ShoppingCartIcon />} onClick={() => addItemToCart(c)}>
	                    Add to Cart
	                  </Button>
                </Box>
                <CardActions>
                  <Checkbox {...label} checked={c.isFav} onChange={() => changeFavIcon(c)} icon={<FavoriteBorder />} checkedIcon={<Favorite style={{color: '#E1306C'}}/>} />
                  <EditIcon onClick={() => callEditApi(c.ID)} color="success" position="right"></EditIcon>
                  <DeleteIcon onClick={() => callDeleteApi(c.ID)} sx={{ color: red[800] }} position="right"></DeleteIcon>
                </CardActions>
              </Card>
          </Grid>)
        }) : <></>}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-new-post"
        aria-describedby="takes-user-input-to-create-a-new-post"
      >
        <Box sx={boxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Post
          </Typography>
          <Box>
            <form onSubmit={callCreateApi}>
              <div>
                <TextField fullWidth id="outlined-basic" name="name" label="Name" variant="outlined" margin="normal" />
              </div>
              <div>
                <TextField fullWidth id="outlined-multiline-flexible" name="Description" label="Description" multiline maxRows={4} margin="normal" />
              </div>
              <div>
                <TextField fullWidth id="outlined-basic" name="Location" label="Location" variant="outlined" margin="normal" />
              </div>
              <div>
                <TextField fullWidth id="outlined-basic" name="Dimensions" label="Dimensions" variant="outlined" margin="normal" />
              </div>
              <div>
                <TextField fullWidth margin="normal"
                    label="Weight"
                    name = "Weight"
                    id="outlined-start-adornment"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">lb</InputAdornment>,
                    }}
                  />
              </div>
              <div>
                <TextField fullWidth id="outlined-basic" name="Age" label="Age" variant="outlined" margin="normal" />
              </div>
              <div>
                <TextField fullWidth id="outlined-basic" name="Count" label="Count" variant="outlined" margin="normal" />
              </div>
              <div>
              <div>React S3 File Upload</div>
                <input name='file' type="file" onChange={handleFileInput} />
              </div>
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openCart}
        onClose={handleCartClose}
        aria-labelledby="add-item-to-cart"
        aria-describedby="takes-user-input-to-add-item-to-cart"
      >
        <Box sx={boxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cart
          </Typography>
          
              <Box>
              
                <form onSubmit={placeOrder}>
                <ul>
                {cartItems != null && cartItems.length > 0 ? cartItems.map(function (c, i) {
   return (
     <div>

     <CardMedia style={{display: 'inline-block'}}
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={c.imageUrl}
                />
        <Typography style={{display: 'inline-block'}}>{c.count} X {c.name}</Typography>
        </div>
    )
            }) : <div>Your Cart is Empty</div>}
            </ul>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 7}}>
	                    <Button type="submit" variant="contained" endIcon={<SendIcon />}>
	                      Place Order
	                    </Button>
                  </Box>              
                </form>
              </Box>
          
        </Box>
      </Modal>

    </Box>
        
  );
}

export default Home;