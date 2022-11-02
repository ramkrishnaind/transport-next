import { Button, Drawer, Space } from "antd";
import React, { useState } from "react";
const App = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const showDefaultDrawer = () => {
    setSize("default");
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Space>
        <Button type="primary" onClick={showDefaultDrawer}>
          Open Default Size (378px)
        </Button>
        
      </Space>
      <Drawer
        title={`White Gloves`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}>
        <p onClick={onClose}>My Profile</p>
        <p onClick={onClose}>Move Now</p>
        <p onClick={onClose}>My Order</p>
      </Drawer>
    </>
  );
};
export default App;
