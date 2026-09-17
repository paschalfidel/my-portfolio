import assert from 'node:assert/strict'
import test from 'node:test'
import contactRoutes from '../src/routes/contactRoutes.js'
import { escapeHtml, formatMessage } from '../src/utils/emailService.js'

test('contact router exposes only the public submission endpoint', () => {
  const routes = contactRoutes.stack
    .filter(layer => layer.route)
    .map(layer => ({ path: layer.route.path, methods: Object.keys(layer.route.methods) }))

  assert.deepEqual(routes, [{ path: '/submit', methods: ['post'] }])
})

test('email content escapes user-controlled HTML', () => {
  assert.equal(escapeHtml('<img src=x onerror="alert(1)">'), '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;')
  assert.equal(formatMessage('Hello\n<script>bad()</script>'), 'Hello<br>&lt;script&gt;bad()&lt;/script&gt;')
})
