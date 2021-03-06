import {useState} from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useSWR from "swr";
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import Fingerprint from '@mui/icons-material/Fingerprint';
import DeleteIcon from '@mui/icons-material/Delete';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import Popup from 'reactjs-popup';
import Fab from "@material-ui/core/Fab";
import sigCanvas from '../startseite/sigCanvas.module.css';
import SignaturePad from "react-signature-canvas";
import { useRef } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { MenuList } from "@mui/material";

const fetcher = (...args) => fetch(...args).then((response) => response.json())
console.log("--> Details")

export default function Start() {
    const { query } = useRouter()
    const router = useRouter()
    let kurzzeichen = query.param;
    let id = query.param2;

    const [von, setVon] = useState();
    const [bis, setBis] = useState();
    const [AUFTRAGNEHMER_UNTERSCHRIFT, setAUFTRAGNEHMER_UNTERSCHRIFT] = useState('')
   
    const { data, error } = useSWR(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/find?id=${id}`, fetcher);

    const sigCanvasRef = useRef({});
    const clear = () => sigCanvasRef.current.clear();
    const save = () => {
        let base64 = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
        let blob = dataURItoBlob(base64);
        const blobUrl = URL.createObjectURL(blob);
        setAUFTRAGNEHMER_UNTERSCHRIFT(blob);
        console.log(base64)
        console.log("Unterschrift wurde gespeichert!")
    }
    
    const unterschreiben = async () => {
        const updateBest??tigt = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/update?id=${id}&status=Best??tigt&auftragnehmer_unterschrift=${AUFTRAGNEHMER_UNTERSCHRIFT}`, {
            method: 'PUT'
        })
    }

    function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = null;
        // TypeError old chrome and FF
        window.BlobBuilder = window.BlobBuilder || 
                             window.WebKitBlobBuilder || 
                             window.MozBlobBuilder || 
                             window.MSBlobBuilder;
        if(window.BlobBuilder){
             var bb = new BlobBuilder();
             bb.append(ab);
             blob = bb.getBlob(mimeString);
        }else{
             blob = new Blob([ab], {type : mimeString});
        }
        return blob;
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    function deleteAuftrag() {
        //l??schfunktion machen AMIR#########################
        //l??schfunktion machen AMIR#########################
        //l??schfunktion machen AMIR#########################
        //l??schfunktion machen AMIR#########################
        //l??schfunktion machen AMIR#########################
        //l??schfunktion machen AMIR#########################

        // asdaskldfjalskd 
        // asdaskldfjalskddfasd
        // fasdf
        // asdaskldfjalskddfasdfasdfasdf
        // asd
        // fasdff
        // asdaskldfjalskddfasdfasdfasdffas
        // fadasd
        // fasd
        // fasd
        // fasfasdf
        // as
        // dfa

    }

    const [signatureMode, setSignatureMode] = useState(false);

    function changeMode() {
        if(signatureMode == false){
            setSignatureMode(true)
        } else {
            setSignatureMode(false)
        }
    }

    const classes = useStyles();
    return(
        <div>
            <div className={classes.kopf}>
                <div>
                <div>
                    <Button
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MenuIcon fontSize="large" />
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuList>
                            <MenuItem onClick={() => router.push(`/mitarbeiter/login`)}><LogoutIcon />Logout </MenuItem>
                            <MenuItem onClick={() => router.back()}><HomeIcon />Startseite</MenuItem>
                        </MenuList>
                    </Menu>
                    </div>
                </div>                  
                <Typography variant="h4"> Details </Typography>
                <Typography variant="h6" className={classes.kopfInfo}>{kurzzeichen}</Typography>
            </div>
            {signatureMode == false ? <div>
            {data && data.map((auftrag) =>                    
            <div className={classes.container}>
                <div className={classes.box}>
                    <div className={classes.contentInfo}>Id</div>
                    <div className={classes.contentInfo}>Auftrag</div>
                </div>
                <div className={classes.box2}>
                    <TextField className={classes.contentAuftrag} defaultValue={auftrag.ID} variant="standard" size="small" inputProps={{ readOnly: true, }}/>                 
                    <TextField className={classes.contentAuftrag} defaultValue={auftrag.AUFTRAG} variant="standard" size="small" inputProps={{ readOnly: true, }}/>
                </div>

                <div className={classes.box}>
                    <div className={classes.contentInfo}>Ksv</div>
                    <div className={classes.contentInfo}>Sperren</div>
                </div>
                <div className={classes.box2}>
                    <TextField className={classes.contentAuftrag} defaultValue={auftrag.KSV} variant="standard" size="small" inputProps={{ readOnly: true, }}/>                 
                    <TextField className={classes.contentAuftrag} defaultValue={auftrag.SPERREN} variant="standard" size="small" inputProps={{ readOnly: true, }}/>
                </div>

                <div className={classes.box}>
                    <div className={classes.contentInfo}>Von - Bis</div>
                </div>
                <div className={classes.box}>
                    <TextField className={classes.contentDate} defaultValue={auftrag.VON.split('T')[0].split('-')[2] + '-' + auftrag.VON.split('-')[1] + '-' + auftrag.VON.split('-')[0] + ' um ' + auftrag.VON.split('T')[1].split(':')[0] + ':' + auftrag.VON.split('T')[1].split(':')[1]} variant="standard" size="small" inputProps={{ readOnly: true, }}/>                 
                </div>
                <div className={classes.box}>
                    
                </div>
                <div className={classes.box2}>
                    <TextField className={classes.contentDate} defaultValue={auftrag.BIS.split('T')[0].split('-')[2] + '-' + auftrag.BIS.split('-')[1] + '-' + auftrag.BIS.split('-')[0] + ' um ' + auftrag.BIS.split('T')[1].split(':')[0] + ':' + auftrag.BIS.split('T')[1].split(':')[1]} variant="standard" size="small" inputProps={{ readOnly: true, }}/>                 
                </div>

                <div className={classes.box}>
                    <div className={classes.contentInfo}>Kommentar</div>
                </div>
                <div className={classes.box2}>         
                    <TextareaAutosize className={classes.contentKommentar} defaultValue={auftrag.KOMMENTAR} variant="standard" size="small" readOnly/>
                </div>

                <div className={classes.box}>
                    <div className={classes.contentInfo}>Auftraggeber</div>
                    <div className={classes.contentInfo}>Auftragnehmer</div>
                </div>
                <div className={classes.box2}>
                    <TextField className={classes.contentAuftrag} defaultValue={auftrag.AUFTRAGGEBER} variant="standard" size="small" inputProps={{ readOnly: true, }}/>                 
                    <TextField className={classes.contentAuftrag} defaultValue={auftrag.AUFTRAGNEHMER} variant="standard" size="small" inputProps={{ readOnly: true, }}/>
                </div>

                <div className={classes.box}>
                    <div className={classes.contentInfo}>Unterschrift</div>
                    <div className={classes.contentInfo}>Unterschrift</div>
                </div>
                <div className={classes.box2}>
                    <img className={classes.unterschrift} src={auftrag.AUFTRAGGEBER_UNTERSCHRIFT}/>
                    <img className={classes.unterschrift} src={auftrag.AUFTRAGNEHMER_UNTERSCHRIFT}/>
                </div>
            </div>
            )}
            <div>
                
                <Fab className={classes.buttons} onClick={() => changeMode()} variant="extended" color="primary">
                    Unterschreiben<Fingerprint />
                </Fab>
                <Fab className={classes.buttons} onClick={() => deleteAuftrag()} variant="extended" color="primary">
                    L??schen<DeleteIcon/>
                </Fab>
            </div>
            </div> : <div>
                <SignaturePad ref={sigCanvasRef} 
                canvasProps={
                    {
                        style: { border:'solid', borderWidth: '7px', borderRadius: '5px', margin: 'auto', borderColor: '#143968', display: 'flex', alignContent: 's', background: '#e0e0e0', width: '90%', minHeight: '600px'}
                    }
                }/>
                <div className={classes.buttons}>
                    <Button color="primary" variant="contained" onClick={() => changeMode()}>Zur??ck</Button>
                    <Button color="primary" variant="contained" onClick={() => clear()}>Leeren</Button>
                    <Button color="primary" variant="contained" onClick={() => save()} >Speichern</Button>
                    <Button color="primary" variant="contained" onClick={() => unterschreiben()}>Unterschreiben</Button>
                </div>          
            </div>}
        </div>
    )
}

const useStyles = makeStyles({
    unterschrift:{
        width: '50%',
    },

    kopf: {
        background: 'linear-gradient(45deg, #143968 30%, #143968 90%)',
        boxShadow: '0 3px 5px 2px rgba(20, 57, 104, .3)',
        marginTop: 0,
        paddingTop: 15,
        marginBottom: "5%",
        height: 60,
        color: 'white',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'space-between',
        display: 'flex',
    },

    kopfInfo: {
        width: 60,
        height: 30,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        textAlign: 'center',
        position: 'relative',
        right: '2%',
        top: '15%'
    },

    container: {
        margin: 20,
        padding: '20px',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    },
    
    contentInfo: {
        fontWeight: 'bold',
        width: '50%',
        fontSize: 18,
        paddingBottom: 7,
    },

    contentDate: {
        width: '55%',
        fontSize: 15,
        paddingBottom: 10,
        background: 'white',
        fontFamily: 'Arial'
    },

    contentKommentar: {
        width: '100%',
        fontSize: 15,
        paddingBottom: 10,
        background: 'white',
        fontFamily: 'Arial'
    },

    contentAuftrag: {
        width: '50%',
        fontSize: 15,
        background: 'white',
        fontFamily: 'Arial',
        color: 'green'
    },

    box: {
        display: 'flex',
        marginRight: 10,
    },

    box2: {
        display: 'flex',
        marginBottom: 20
    },

    buttons: {
        marginRight: 20,
        float: 'right'
    }
})

