export const EDITOR_OPTIONS_MINI = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'align': [] }],
    ]
};
export const EDITOR_OPTIONS_MEDIUM = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }],
    ]
};
export const EDITOR_OPTIONS_MAX = {
    toolbar: [
        [{ 'placeholder': ['[GuestName]', '[HotelName]'] }], // my custom dropdown
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video',],                      //image and video link set
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                    // remove formatting button

    ]
};