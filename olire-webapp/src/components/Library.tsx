type LibraryProp = {
    name: string
    description: string
    url: string
}

const Library: React.FC<LibraryProp> = ({ name, description, url }) => {
    return (
        <>
            <div className="bg-white shadow-lg rounded-lg p-6 mt-1">
                <h2 className="text-2xl font-bold mb-4">{name}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <a href={url} className="text-blue-500 font-medium hover:underline" target="_blank" rel="noopener noreferer">Visit Library</a>
            </div>
        </>
    )
}

export default Library;