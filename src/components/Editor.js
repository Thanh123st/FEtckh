// components/Editor.js
import React from 'react';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';

const Editor = ({ value, setContent }) => {
    return (
        <TinyMCEEditor
            apiKey="ku1qhddhf4bgfrm1nfisqwkxfagjy26448g5zv37a4obr5kf"
            value={value}
            init={{
                height: 300,
                max_height: 400,
                menubar: false,
                branding: false,
                plugins: [
                // Core editing features
                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                // Your account includes a free trial of TinyMCE premium features
                // Try the most popular premium features until Nov 15, 2024:
                'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                // Early access to document converters
                'importword', 'exportword', 'exportpdf'
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
                ],
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                exportpdf_converter_options: { 'format': 'Letter', 'margin_top': '1in', 'margin_right': '1in', 'margin_bottom': '1in', 'margin_left': '1in' },
                exportword_converter_options: { 'document': { 'size': 'Letter' } },
                importword_converter_options: { 'formatting': { 'styles': 'inline'}},
                content_style: `
                    body { max-height: 400px;font-family: Arial, sans-serif; font-size: 14px; color: #333; background-color: #fafafa; }

                `,
            }}
            onEditorChange={(content) => setContent(content)}
        />
    );
};

export default Editor;
