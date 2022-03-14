import styled from "styled-components";

export const Item = styled.div` 

    a{
        display: block;
        background-color: #FFF;
        border:  1px solid #FFF;
        margin: 10px;
        text-decoration: none;
        padding: 10px;
        border-radius: 5px;
        color: #000;
        transition: 0.2s;

        &:hover{
            border: 1px solid #CCC;
            transform: scale(1.1);
        }
        
        .item-image{

            img{
                width: 100%;
                border-radius: 5px;
            }
        }

        .item-name{
            font-weight: bold;
        }
    }

`