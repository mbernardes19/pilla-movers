/* eslint-disable @next/next/no-img-element */

export const DateInput = () => {
    return (
        <>
            <form>
                <input type="date" onChange={(data) => console.log(data)} onSubmit={(e) => console.log(e)} />
                <input type="submit" />
            </form>
        </>
    )
}