import styled from "styled-components";

export const Fake = styled.div`
    background: #DDD;
    height: ${props=>props.height || 20}px};

`;

export const BreadChumb = styled.div`
    font-size: 13px;
    margin-top: 20px;
    
    a{
        display: inline-block;
        margin: 0 5px;
        text-decoration: underline;
        color: #000;
    }

@media (max-width: 600px) {
    margin: 20px;
}
`;

export const PageArea = styled.div`
    display: flex;
    margin-top: 20px;

    .box {
        background: #FFF;
        border-radius: 5px;
        box-shadow: 0px 0px 4px #999;
        margin-bottom: 20px;
    }

    .left-side {
        flex: 1;
        margin-right: 20px;

        .box{
            display: flex;
        }

        .ad-image {
            align-items: center;
            width: 320px;
            height: 320px;
            background: #CCCCCC;
            margin-right: 20px;

            .each-slide img{
                display: flex;
                align-items: center;
                justify-content: center;
                background-size: cover;
                height: 320px;
            }
        }

        .ad-info{
            flex: 1;

            .ad-name {
                margin-bottom: 20px;

                h2{
                    margin: 0;
                    margin-top: 20px;
                }

                small{
                    color: #777;
                }
            }

            .ad-description{

                small {
                    color: #777;
                }
            }
        }
    }

    .right-side {
        width: 250px;

        .price {

            span {
                color: #3535c7;
                display: block;
                font-size: 27px;
                font-weight: bold;
            }
        }
        
        .box{
            padding: 10px;
        }

        .contact-seller-link{
            background-color: #3535c7;
            color: #FFF;
            height: 30px;
            border-radius: 5px;
            box-shadow: 0 0 4px #999;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            margin-bottom: 20px;

            &:hover{
                background: #252592;
            }
        }
        
        .createdBy{
            strong{
                display: block;
                font-size: 16px;
            }

            small{
                display: block;
                color: #777;
                margin-top: 5px;
            }
        }
    }

@media (max-width: 600px) {
    flex-direction: column;

    .left-side{
        margin: 0;
        .box{
            width: 320px;
            flex-direction: column;
            margin: auto;

            .ad-info{
                padding: 10px;
            }
        }
    }

    .right-side{
        width: auto;
        margin-top: 20px;

        .box{
            width: 320px;
            margin: auto;
        }
        .contact-seller-link{
            width: 320px;
            margin: 20px auto;
        }
    }
}
`;

export const OthersArea = styled.div`

    h2 {
        font-size: 20px;
    }

    .list {
        display: flex;
        flex-wrap: wrap;
    }
        
    .adItem {
        width: 25%;
    }

@media (max-width: 600px) {
    margin: 10px;

    .adItem {
        width: 50%;
    }
}
`