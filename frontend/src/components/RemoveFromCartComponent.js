import { Button } from "react-bootstrap";

const RemoveFromCartComponent = ({ productID, orderCreated, removeFromCartHandler = false }) => {
    return (
       <Button
       style ={orderCreated?{ display: "none" }: {display:"inline"}}
       disabled={orderCreated}
       type="button"
       variant="secondary"
       onClick={removeFromCartHandler ? () => removeFromCartHandler(productID) : undefined}
       >
         <i className="bi bi-trash"></i>  
       </Button>  
    )
}

export default RemoveFromCartComponent;