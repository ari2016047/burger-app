import React from 'react';
import classes from './Input.css';

const input = (props) =>{
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    let error=null;

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
        error = <p className={classes.ValidationError}>Please enter a valid value!</p>
    }

    switch(props.elementType){
        case ( "input" ):
            inputElement = <input 
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    />;
            break;
        case ( "textarea" ):
            inputElement = <textarea
                     className={inputClasses.join(' ')} 
                     {...props.elementConfig}
                     value={props.value}
                     onChange={props.changed}
                     />;
            break;
        case ( "select" ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(i =>(
                        <option key={i.value} value={i.value}>{i.displayValue}</option>
                    ))}
                </select>
            );
            break;            
        default:
            console.log('inside default');
            inputElement = <input 
                     className={inputClasses.join(' ')} 
                     {...props.elementConfig} 
                     value={props.value}
                     onChange={props.changed}
                     />;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {error}
        </div>
    );
}

export default input;