export const setSession = () => {
    if (typeof window !== 'undefined') {
        if (!localStorage.getItem('session')) {
            const uuid = crypto.randomUUID()
            localStorage.setItem('session', uuid)
        }
    }
}