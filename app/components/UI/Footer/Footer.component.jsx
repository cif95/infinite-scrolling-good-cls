'use client';

export const FooterBox = ({show}) => {

    return (
        <footer className={show ? 'visible' : 'not-visible'}> FOOTER </footer>
    )
}