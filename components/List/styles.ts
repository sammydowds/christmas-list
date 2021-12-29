import { css } from '@emotion/react'

export const container = css`
    background: #E0C9A625;
    border-radius: 10px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 0px 30px 0px;
    width: 100%;
    margin: 15px 0px;
`

export const present = css`
    display: flex;
    align-items: center;
    margin: 5px 0px;
    padding: 10px;
    border: 2px solid black;
    border-radius: 10px;
    width: 90%;
    background: white;
    &:hover {
        cursor: pointer;
    }
`

export const presentCrossedOff = css`
    border: 2px solid lightgrey;
`

export const presentCrossedOffText = css`
    color: grey;
    text-decoration: line-through;
`