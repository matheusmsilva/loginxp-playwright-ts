import { test, expect } from '@playwright/test'
import { Login, Account } from './support/actions/Login'

let login: Login
test.beforeEach(({ page }) => {
  login = new Login(page)
})

test('deve logar com sucesso', async ({ page }) => {
  const account: Account = {
    username: 'qa',
    password: 'xperience'
  }

  await login.submit(account)
  await expect(await login.getPoputContent())
    .toContainText('Suas credenciais são válidas :)')
})

test('não deve logar com senha inválida', async ({ page }) => {
  const account: Account = {
    username: 'qa',
    password: 'abc123'
  }

  await login.submit(account)
  await login.assertToast('Oops! Credenciais inválidas :(')
})

test('não deve logar quando não preencho os campos', async ({ page }) => {
  const account: Account = {
    username: '',
    password: ''
  }

  await login.submit(account)
  await login.assertToast('Informe o seu nome de usuário!')
})

test('não deve logar quando não informo a senha', async ({ page }) => {
  const account: Account = {
    username: 'qa',
    password: ''
  }

  await login.submit(account)
  await login.assertToast('Informe a sua senha secreta!')
})

test('não deve logar quando não informo o usuário', async ({ page }) => {
  const account: Account = {
    username: '',
    password: 'xperience'
  }

  await login.submit(account)
  await login.assertToast('Informe o seu nome de usuário!')
})
