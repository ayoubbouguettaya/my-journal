// const [showBoldItalicBtn, setShowBoldItalicBtn] = useState(false);

//     const handleWrappSelection = (tag) => {
//         try {
//             const wrapperElement = document.createElement(tag)
//             wrapperElement.setAttribute("contentEditable", "false")
//             const selection = document.getSelection();
//             const parentElementTagName = selection.anchorNode.parentElement.tagName;
//             const parentOfparentElementTagName = selection.anchorNode.parentElement.parentElement.tagName;

//             if (parentElementTagName === 'P' || (parentElementTagName === 'B' && tag === 'I') || (parentElementTagName === 'I' && tag === 'B') && parentOfparentElementTagName !== tag) {
//                 selection.getRangeAt(0).surroundContents(wrapperElement)
//             }
//         } catch (error) {
//             console.log('Error Ocured when trying  wrapp element');
//         }
//     }

//     const addSection = () => {
//         const contentElement = document.getElementById("content");
//         contentElement.innerHTML += sectionHtmlTemplate;

//         const Allh2 = Array.from(contentElement.getElementsByTagName("h2"));
//         Allh2.forEach((ele) => ele.addEventListener('focus', handleFocus));


//         const Allp = Array.from(contentElement.getElementsByTagName("p"));
//         Allp.forEach((ele) => ele.addEventListener('focus', handleFocus));

//     }

//     const AddLink = () => {
//         const href = "http://facebook.com".toString();
//         const label = "facebook"
//         const link = document.createElement("a");
//         link.setAttribute("contentEditable", "false")
//         link.setAttribute("href", href)
//         link.innerHTML = label;
//         document.getSelection().getRangeAt(0).insertNode(link)
//     }

//     const AddImage = () => {
//         const divider = document.getElementById("content").lastChild.lastChild;
//         const image = document.createElement('img');
//         const figure = document.createElement('figure');
//         image.setAttribute('src','/posts/unnamed.jpg')
//         figure.appendChild(image);
//         document.getElementById("content").lastChild.insertBefore(figure,divider)
//     }

//     const handleFocus = (event) => {
//         const spans = event.target.getElementsByTagName("span");
//         if (spans && spans[0]) {
//             spans[0].remove();
//         }
//     }

//     useEffect(() => {
//         const handleSelect = (event) => {
//             const selection = document.getSelection();
//             if (selection.type === "Range" && selection.anchorNode && document.getElementById('content').contains(selection.anchorNode)) {
//                 setShowBoldItalicBtn(true)
//             } else {
//                 setShowBoldItalicBtn(false)
//             }
//         }

//         const contentElement = document.getElementById("content");

//         contentElement.firstChild.getElementsByTagName("h2")[0].addEventListener('focus', handleFocus);
//         contentElement.firstChild.getElementsByTagName("p")[0].addEventListener('focus', handleFocus);

//         document.addEventListener('selectionchange', handleSelect);

//         return () => {
//             document.removeEventListener('selectionchange', handleSelect);
//             if (contentElement){
//                 const Allh2 = Array.from(contentElement.getElementsByTagName("h2"));
//                 const Allp = Array.from(contentElement.getElementsByTagName("p"));
    
//                 Allh2.forEach(element => {  
//                     element.removeEventListener('focus', handleFocus)
//                 });
    
//                 Allp.forEach(element => {
//                     element.removeEventListener('focus', handleFocus)
//                 });
//             }
//         }
//     }, []);
const zert= "eqfsgr";

export {}