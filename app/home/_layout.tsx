import {Stack} from "expo-router";

const HomeLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="index" options={{title:"home"}}/>
            <Stack.Screen name="SettingsScreen" options={{title:"SettingsScreen"}}/>
        </Stack>
    )
}

export default HomeLayout