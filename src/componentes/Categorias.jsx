import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="light" 
        >
          Categorias
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="aguas">Aguas</DropdownItem>
        <DropdownItem key="alcohol">Alcohol</DropdownItem>
        <DropdownItem key="cervezas">Cervezas</DropdownItem>
        <DropdownItem key="gaseosas" className="text-danger" color="danger">
        Gaseosas
        </DropdownItem>
        <DropdownItem key="vinos">Vinos</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
