import styled from "styled-components";

export const HeaderArea = styled.header`
    background-color: #FFF;
    height:60px;
    border-bottom: 1px solid #CCC;

.container{
    max-width: 1000px;
    margin: auto;
    display: flex;
    height: 100%;
}

.logo{
    flex:1;
    display: flex;
    align-items: center;

    .logo-1,.logo-2,.logo-3{
        font-size: 27px;
        font-weight: bold;
    }
    .logo-1{ color: #FF0000; }
    .logo-2{ color: #00FF00; }
    .logo-3{ color: #0000FF; }
}

nav{
    padding: 10px 0;

    ul, li{
        margin: 0;
        padding: 0;
    }

    ul{
        display: flex;
        align-items: center;
        height: 40px;
    }
    li {
        margin: 0 15px;

        a, button{
            border: 0;
            background: none;
            color: #000;
            font-size: 16px;
            font-weight: 400;
            cursor: pointer;

            &:hover{
                color: #666;
            }

            &.postButton {
                background-color: #FF8100;
                border-radius: 4px;
                color: #FFF;
                padding: 5px 10px;
                transition: 0.2s;
            }

            &.postButton:hover{
                background: #E57706;
            }
        }
    }
}

@media (max-width: 600px) {
    & {
        height: auto;
    }

    .container{
        flex-direction: column;
    }

    .logo{
        justify-content: center;
        margin: 10px 0;
    }

    nav ul{
        flex-direction: column;
        height: auto;
    }
    nav li{
        margin: 10px 20px;
    }

}
`