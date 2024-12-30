#Requires AutoHotkey v2.0

; https://www.autohotkey.com/boards/viewtopic.php?t=124463
#^t::{
    URL := "http://localhost:13130/translate"
    Method := "POST"
    A_ClipBoard := StrReplace(A_ClipBoard, "`r", "")
    A_ClipBoard := StrReplace(A_ClipBoard, "`n", "")
    clip := "@" . A_Clipboard
    Body := '{"sentence": "' . clip . '"}'

    WHR := ComObject("WinHttp.WinHttpRequest.5.1")
    WHR.Open(Method, URL, true)
    WHR.SetRequestHeader("Content-Type", "application/json")
    WHR.Send(Body)

    WHR.WaitForResponse()
    ; ResponseText := WHR.ResponseText
    ; MsgBox ResponseText
}
