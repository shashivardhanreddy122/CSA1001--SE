## 📋 Pull Request Review Checklist

### Code Quality & Standards
- [ ] Code follows project style guidelines (ESLint / Oxlint passed without errors).
- [ ] No hardcoded secret keys or passwords in commit history.
- [ ] Async/await operations include proper `try...catch` error handling.

### Functionality & Integration
- [ ] Feature meets all requirements specified in the issue/ticket.
- [ ] API endpoints return consistent JSON data formats with fallback handling.
- [ ] UI components render correctly without console errors or broken state.

### Testing & Verification
- [ ] Production build succeeds (`npm run build`).
- [ ] Verified locally on Chrome/Firefox in desktop and mobile viewports.

### Documentation
- [ ] Updated API table in `README.md` if new endpoints were introduced.
- [ ] Added inline JSDoc/comments for complex business logic.
