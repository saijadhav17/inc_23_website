function FormsBanner(props) {
    return (
        <header className=" flex shadow-md shadow-light_blue/20 bg-light_blue/30 rounded-xl border-light_blue items-center p-4 md:p-8 border border-light_blue md:mx-20 mx-5 mt-10">
            <div className="w-20 h-auto shadow-white">
                <img src={props.logo} alt="" />
            </div>
            <div className='flex flex-col justify-center gap-3'>
                <h1 className="text-xl md:text-3xl font-poppins text-gold font-bold tracking-wider underline underline-offset-4 decoration-1 decoration-light_blue uppercase">{props.eventName}</h1>
                <h2 className="text-lg md:text-2xl border-l-2 border-gold md:font-light md:leading-6 pl-2">{props.eventDescription}</h2>
            </div>
        </header>
    );
}

export default FormsBanner;