import styled from 'styled-components'


export const PageArea = styled.div`
    display: flex;
    margin-top: 20px;

    .left-side{
        width: 250px;
        margin-right: 10px;

        .filterName{
            font-size: 15px;
            margin: 10px 0;   
        }

        input, select{ 
            width: 100%;
            height: 40px;
            border: 2px solid #9bb83c;
            outline: 0;
            font-size: 15px;
            color: #000;
            padding: 10px;
        }

        ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        
        .category-item {
            display: flex;
            padding: 10px;
            margin-bottom: 3px;
            align-items: center;
            color: #000;
            border-radius: 5px;
            cursor: pointer;

            img{
                width: 25px;
                height: 25px;
                margin-right: 5px;
            }
            span {
                width: 14px;
            }
        }

        .category-item:hover,
            .category-item.active{
                background: #9bb83c;
                color: #FFF;
            }
    }
    .right-side{
        flex: 1;
        width: 40vw;

        h2{
            margin-top: 0;
            font-size: 18px;
        }

        .list-warning{
            padding: 30px;
            text-align: center;
        }

        .list{
            display: flex;
            flex-wrap: wrap;

            .adItem{
                width: 33%;
            }
        }

        .pagination{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            margin:10px 0;

            .pag-item{
                overflow-x: hidden;
                font-size: 12px;
                width: 20px;
                height: 20px;
                border: 1px solid #000;
                display: flex;
                margin-left: 5px;
                margin-bottom: 5px;
                align-items: center;
                justify-content: center;
                cursor: pointer;

                &:hover{
                    border: 1px solid #999;
                }

                &.active{
                    background: #DDD;
                }
            }
        }

    }


@media (max-width: 600px) {
    flex-direction: column;

    .left-side{
        width: auto;
        margin: 10px;

        ul {
            display: flex;
            flex-wrap: wrap;

            li {
                width: 50%;
            }
        }
    }

    .right-side {
        margin: 10px;
        width: auto;

        .list .adItem{
            width: 50%;
        }
    }
}
`;