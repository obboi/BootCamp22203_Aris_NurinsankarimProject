import React from "react";

const list = [{data:"tags1"},{data:"tags2"},{data:"tags3"}]

export default function Kontaks(){
    const listData = list.map((item) => {
        return <p>{item.data}</p>
    })

    return(
        <div>
            <p>{listData}</p>
        </div>
    )
}
    