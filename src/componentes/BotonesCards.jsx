import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { CgMathPlus } from "react-icons/cg";
import { CgMathMinus } from "react-icons/cg";

export default function App() {

    const [conteo, setConteo] = useState(0);

    const sumaConteo = () => {
        setConteo(conteo + 1);
    };

    const restaConteo = () => {

        if (conteo != 0) {
            setConteo(conteo - 1)
        };
    };

    return (
        <div className="flex flex-wrap gap-4 justify-between w-full">
            <Button isIconOnly
                radius="full"
                size="sm"
                color="primary"
                className="hover:bg-black">
                <CgMathMinus
                    color="primary"
                    onClick={restaConteo}
                    style={{ fontSize: 15 }}
                />

            </Button>

            <p className="font-semibold text-white"> {conteo} </p>
            <Button isIconOnly
                radius="full"
                size="sm"
                color="primary"
                className="hover:bg-black">
                <CgMathPlus
                    color="primary"
                    onClick={sumaConteo}
                    style={{ fontSize: 15 }}
                />
            </Button>
        </div>
    );
}