import React, {useReducer} from 'react'
import { Button, Checkbox, Typography, FormGroup, FormControlLabel } from '@mui/material';
import Input from '../../../components/Input/Input';
import './CreateStaff.css'

const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_INPUT": {
            return {
                ...state,
                [action.label] : action.value
            }
        }
        case "UPDATE_CHECKBOX": {
            return {
                ...state,
                permission : action.permission
            }
        }
        case "CLEAR_STATE": {
            return {
                uname : "",
                phno : "",
                pword : "",
                permission : {
                    create : false,
                    update : false,
                    delete : false,
                    order : false
                }
            }
        }
        default:
            break;
    }
}

const CreateStaff = () => {
    const [state, dispatch] = useReducer(reducer, {
        uname : "",
        phno : "",
        pword : "",
        permission : {
            create : false,
            update : false,
            delete : false,
            order : false
        }
    })

    const inputChangeHandler = (label, value) => {
        dispatch({
            type : "UPDATE_INPUT",
            label,
            value
        })
    }

    const checkboxHandler = (label, value) => {
        const updatePermission = {...state.permission}
        updatePermission[label] = value;
        dispatch({
            type : "UPDATE_CHECKBOX",
            permission : updatePermission
        })
    }

    const cancleHandler = () => {
        dispatch({
            type : "CLEAR_STATE"
        })
    }

    const submitHandler = () => {
        const datas = {...state}
        console.log(datas)
    }

    const canClickCreate = () => {
        // if there's nothing, return false
        const canClick = state.uname.length > 0 && state.phno.length > 0 && state.pword.length > 0;
        return canClick; // return true
    }

    return <div className="CreateStaff">
        <form className="CreateStaff_form">
            <Typography variant="h3" className="CreateStaff_title">Create Staff</Typography>
            <div className="createStaff_inputGp">
                <p>Username</p>
                <Input id="uname" label="Username" value={state.uname} changed={inputChangeHandler} />
            </div>
            <div className="createStaff_inputGp">
                <p>PhoneNo</p>
                <Input id="phno" label="Phone No" value={state.phno} changed={inputChangeHandler} />
            </div>
            <div className="createStaff_inputGp">
                <p>Password</p>
                <Input id="pword" label="Password" value={state.pword} changed={inputChangeHandler} />
            </div>
            <div className="createStaff_inputGp">
                <p>Permission</p>
                <FormGroup style={{display : "flex", flexDirection : "row"}}>
                    <FormControlLabel control={<Checkbox checked={state.permission.create} />} label="Create" onChange={e => checkboxHandler("create", e.target.checked)} />
                    <FormControlLabel control={<Checkbox checked={state.permission.update} />} label="Update" onChange={e => checkboxHandler("update", e.target.checked)} />
                    <FormControlLabel control={<Checkbox checked={state.permission.delete} />} label="Delete" onChange={e => checkboxHandler("delete", e.target.checked)} />
                    <FormControlLabel control={<Checkbox checked={state.permission.order} />} label="Check Order" onChange={e => checkboxHandler("order", e.target.checked)} />
                </FormGroup>
            </div>
            <div className="createStaff_inputGp">
                <p></p>
                <FormGroup style={{display : "flex", flexDirection : "row", width : "215px", justifyContent : 'space-between'}}>
                    <Button variant="contained" color="error" onClick={cancleHandler}>Cancle</Button>
                    <Button variant="contained" color="info" onClick={submitHandler} disabled={!canClickCreate()}>Create</Button>
                </FormGroup>
            </div>
        </form>
    </div>
}

export default CreateStaff