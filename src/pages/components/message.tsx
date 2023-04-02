import "./message.css";
export const Message = (promp:any) => {
  const role = promp.role
  const msg = promp.msg
  console.log(promp.msg)
  console.log(promp)
  // console.log(role)
  if (role === 'assistant') {
    return <div className="mensaje-izq">
    <div className="message-content">{msg}</div>
  </div>; 
  }
  return <div className="mensaje-der">
    <div className="message-content">{msg}</div>
  </div>;
};
