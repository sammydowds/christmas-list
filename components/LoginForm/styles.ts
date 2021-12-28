import { css } from '@emotion/react'

export const form = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 250px;
`

export const submitButton = css`
    height: 45px;
    font-size: 30px;
    background: red;
    color: white;
    border-color: green;
    border-radius: 5px;
    margin: 20px 0px;
`

export const label = css`
    font-size: 20px;
`

export const input = css`
    margin-top: 5px;
    height: 50px;
    width: 100%;
    border-radius: 10px;
    font-size: 30px;
    padding: 0px 15px;
`