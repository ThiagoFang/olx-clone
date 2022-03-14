import styled from "styled-components";

export const PageArea = styled.div`
    background: #FFF;
    displaY: flex;
    margin: 20px 0;
    box-shadow: 0 0 10px #CCC;
    border: 1px solid #CCC;

    .left-side{
        width: 55%;
        padding: 20px;
        padding-left: 40px;
    
        .user-input{
            border: none;
            padding: 5px;
            width: 50%;
            border-bottom: 1px solid #a3a2a2;
            margin-bottom: 20px;
            transition: .2s;

            &:focus{
                outline: none;
                border-bottom: 1px solid #FF8100;
            }
        }

        .area, .area label {
            display: flex;
            margin-bottom: 20px;

            .area-title {
                margin-right: 10px;
                font-weight: 500;
            }
        }

        .area label{
            margin-bottom: 0px;
        }

        .description-input {
            margin-top: 5px;
            border: none;
            border: 1px solid #a3a2a2;
            width: 150%;
            height: 120px;
            transition: .2s;
            resize: none;

            &:focus{
                outline: none;
                border: 1px solid #FF8100;
            }
        }

        .submitButton{
            margin-top: 10px;
            border-radius: 7px;
            color: #FFF;
            font-weight: 500;
            padding: 7px 15px;
            border: none;
            background-color: #0089FF;
            cursor: pointer;

            &:hover{
                background: #006FCE;
                box-shadow: 0 0 3px #72bcfc;
            }
        }
    }

    .right-side{
        flex: 1;
        background-image: url("https://images.pexels.com/photos/4068314/pexels-photo-4068314.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260");
        background-position: center;
        background-size: cover;

    }

@media (max-width: 600px){


    .right-side {
        display: none;
    }
}
`;