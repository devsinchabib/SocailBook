import React from 'react'
import './Toast.css'
function Toast(props) {

    setTimeout(() => {
        props.set(false)

               }, 2000);
    return (
        <>
        
            <div className="toast col-12 d-block align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex col-12">
                    <div className="toast-body col-12">
                        {props.message}
                    </div>

                </div>
            </div>
            
        </>
    )
}

export default Toast
