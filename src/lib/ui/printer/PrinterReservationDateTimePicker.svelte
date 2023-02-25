<script lang="ts">
    import { lightFormat, parse, startOfHour } from 'date-fns'

    export let value: Date

    const inputFormat = "yyyy-MM-dd'T'HH:mm"

    $: inputValue = lightFormat(value, inputFormat)

    const handleInputValueChange = ({
        currentTarget,
    }: Event & { currentTarget: HTMLInputElement }) => {
        const newDate = parse(currentTarget.value, inputFormat, new Date())
        value = startOfHour(newDate)
    }
</script>

<input
    type="datetime-local"
    name="startDateTime"
    value={inputValue}
    on:change={handleInputValueChange}
/>
