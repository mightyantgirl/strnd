export default function Toast({ message, visible }) {
  return (
    <div
      className={`
        flex fixed bottom-8 left-1/2 -translate-x-1/2
        bg-tint text-brand px-5 py-3 rounded-full text-xs font-medium transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
    `}>
      <img className="mr-2" src="/img/clip.svg"></img>
      {message}
    </div>
  )
}
