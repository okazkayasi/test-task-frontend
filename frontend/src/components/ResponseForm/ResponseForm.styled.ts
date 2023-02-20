import styled from '@emotion/styled'

export const SForm = styled.form`
  max-width: 700px;
  padding: 2rem;
  box-sizing: border-box;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`

export const STitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`

export const SFormField = styled.div`
  display: flex;
  margin: 0 0 1rem 0;
`

export const SLabel = styled.label`
  padding: 0.5rem;
  box-sizing: border-box;
  justify-content: space-between;
  font-size: 1.1rem;
  text-align: right;
  width: 15%;
`

export const SInput = styled.input`
  width: 70%;
  padding: 0.5rem;
  box-sizing: border-box;
  justify-content: space-between;
  font-size: 1.1rem;
  border: 2px solid #aaa;
  border-radius: 2px;
`
