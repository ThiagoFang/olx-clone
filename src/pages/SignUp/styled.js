import styled from "styled-components";

export const PageArea = styled.div`
  
  .signup-div{
    font-size: 14px;
    margin-top: 20px;

    a{
        color: #006FCE;

        &:hover{
            color: #0089FF;
        }
    }
}

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    background: #FFF;
    border-radius: 3px;
    padding: 30px;
    margin: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    .user-input{
        border: none;
        padding: 5px;
        width: 50%;
        border-bottom: 1px solid #a3a2a2;
        margin-bottom: 20px;
        transition: .4s;

        &:focus{
            outline: none;
            border-bottom: 1px solid #646363;
        }
    }

    .reminder-area{
        display: flex;
        width: 50%;
        padding-bottom: 15px;

        input{
            padding: 2px;
        }
    }

    button{
        width: 50%;
        border: none;
        background: #0089FF;
        padding: 10px 0px;
        border-radius: 15px;
        color: #FFF;
        font-weight: bold;
        letter-spacing: 1px;
        transition: .2s;
        cursor: pointer;

        &:hover{
            background: #006FCE;
            box-shadow: 0 0 15px #72bcfc;
        }
    }

  }
`